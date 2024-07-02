const { pool } = require("./connection");

const getTransactionsByUser = async (userId, isSeller) => {
    if (!isSeller) {
        const query = 'SELECT * from transacciones WHERE buyerId = $1';
        const { rows } = pool.query(query, [userId]);
        return { buyerInfo: rows };
    }

    const buyerQuery = 'SELECT * FROM transacciones WHERE buyerId = $1';
    const sellerQuery = "SELECT t.transactionId, t.buyerId FROM transacciones t WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(t.items->'productos') AS prod WHERE (prod->>'sellerId')::INTEGER = $1);"

    const { rows: buyerInfo } = await pool.query(buyerQuery, [userId]);
    const { rows: sellerInfo } = await pool.query(sellerQuery, [userId]);

    return { buyerInfo: buyerInfo, sellerInfo: sellerInfo };
};

module.exports = { getTransactionsByUser };
