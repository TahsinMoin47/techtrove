import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * GET /api/featured
 * Active featured gadgets with primary image + seller name.
 */
router.get("/featured", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT l.listing_id     AS id,
             l.title,
             l.description,
             l.price,
             l.item_condition,
             l.category_id,
             u.full_name        AS owner_name,
             u.email            AS owner_email,
             u.phone            AS owner_phone,
             (SELECT image_url
                FROM listing_images li
               WHERE li.listing_id = l.listing_id
               ORDER BY sort_order ASC, image_id ASC
               LIMIT 1)          AS image
      FROM featured_listings f
      JOIN listings l ON l.listing_id = f.listing_id
      JOIN users u     ON u.user_id = l.seller_id
      WHERE l.status = 'Live' AND l.is_active = 1
      ORDER BY f.rank ASC, f.starts_at DESC
      LIMIT 30
      `
    );

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/listings
 * Query params: search, categoryId, min, max, sort (price_asc | price_desc)
 */
router.get("/listings", async (req, res) => {
  const { search = "", categoryId = "", min = "", max = "", sort = "relevance" } = req.query;

  const where = [];
  const params = [];

  // only live/active
  where.push("l.status = 'Live' AND l.is_active = 1");

  if (categoryId) {
    where.push("l.category_id = ?");
    params.push(categoryId);
  }

  if (min) {
    where.push("l.price >= ?");
    params.push(Number(min));
  }
  if (max) {
    where.push("l.price <= ?");
    params.push(Number(max));
  }

  if (search) {
    // use FULLTEXT when possible (title/description), fallback LIKE
    where.push("(MATCH(l.title, l.description) AGAINST (? IN NATURAL LANGUAGE MODE) OR l.title LIKE ?)");
    params.push(search);
    params.push(`%${search}%`);
  }

  // sorting
  let orderBy = "l.created_at DESC";
  if (sort === "price_asc") orderBy = "l.price ASC";
  if (sort === "price_desc") orderBy = "l.price DESC";

  try {
    const [rows] = await pool.query(
      `
      SELECT l.listing_id AS id,
             l.title,
             l.description,
             l.price,
             l.item_condition,
             l.category_id,
             u.full_name  AS owner_name,
             u.email      AS owner_email,
             u.phone      AS owner_phone,
             (SELECT image_url
                FROM listing_images li
               WHERE li.listing_id = l.listing_id
               ORDER BY sort_order ASC, image_id ASC
               LIMIT 1) AS image
      FROM listings l
      JOIN users u ON u.user_id = l.seller_id
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      ORDER BY ${orderBy}
      LIMIT 60
      `,
      params
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/listings/:id
 * Single listing with all images.
 */
router.get("/listings/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [[listing]] = await pool.query(
      `
      SELECT l.listing_id AS id,
             l.title,
             l.description,
             l.price,
             l.item_condition,
             l.category_id,
             u.full_name  AS owner_name,
             u.email      AS owner_email,
             u.phone      AS owner_phone
      FROM listings l
      JOIN users u ON u.user_id = l.seller_id
      WHERE l.listing_id = ? AND l.is_active = 1
      LIMIT 1
      `,
      [id]
    );

    if (!listing) return res.status(404).json({ error: "Not found" });

    const [images] = await pool.query(
      `
      SELECT image_id, image_url, sort_order
      FROM listing_images
      WHERE listing_id = ?
      ORDER BY sort_order ASC, image_id ASC
      `,
      [id]
    );

    res.json({ ...listing, images });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
