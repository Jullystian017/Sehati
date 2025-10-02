require('dotenv').config();

const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*'
}));
app.use(express.json());

const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

app.post('/api/create-midtrans-transaction', async (req, res) => {
    try {
        const { name, email, amount, message, campaignId } = req.body || {};

        if (!name || !email || !amount) {
            return res.status(400).json({
                error: 'Kolom nama, email, dan nominal donasi wajib diisi.'
            });
        }

        if (!process.env.MIDTRANS_SERVER_KEY) {
            return res.status(500).json({
                error: 'Server Midtrans belum dikonfigurasi. Set MIDTRANS_SERVER_KEY di file .env.'
            });
        }

        const orderId = `${campaignId || 'sehati-campaign'}-${Date.now()}`;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount
            },
            customer_details: {
                first_name: name,
                email
            },
            item_details: [
                {
                    id: campaignId || 'sehati-campaign',
                    price: amount,
                    quantity: 1,
                    name: `Donasi untuk ${campaignId || 'Sehati Campaign'}`
                }
            ],
            credit_card: {
                secure: true
            },
            custom_field1: message || ''
        };

        const transaction = await snap.createTransaction(parameter);

        return res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url
        });
    } catch (error) {
        console.error('Midtrans error:', error);
        const message = error.ApiResponse?.error_messages?.[0] || error.message || 'Terjadi kesalahan saat membuat transaksi.';
        return res.status(500).json({ error: message });
    }
});

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', environment: process.env.MIDTRANS_IS_PRODUCTION === 'true' ? 'production' : 'sandbox' });
});

app.listen(PORT, () => {
    console.log(`Midtrans server berjalan di port ${PORT}`);
});
