document.addEventListener('DOMContentLoaded', () => {
    const donateBtn = document.querySelector('.btn-donate-main');
    const modal = document.getElementById('donationModal');
    const overlay = document.getElementById('donationModalOverlay');
    const closeBtn = document.getElementById('donationModalClose');
    const donationForm = document.getElementById('donationForm');
    const amountInput = document.getElementById('donationAmount');
    const amountChips = Array.from(document.querySelectorAll('.amount-chip'));
    const submitBtn = donationForm?.querySelector('.btn-submit-donation');

    if (!donateBtn || !modal || !overlay || !closeBtn || !donationForm) {
        return;
    }

    const openModal = () => {
        modal.classList.add('is-visible');
        document.body.classList.add('modal-open');
        amountInput.focus();
    };

    const closeModal = () => {
        modal.classList.remove('is-visible');
        document.body.classList.remove('modal-open');
        donationForm.reset();
        amountChips.forEach(chip => chip.classList.remove('is-active'));
    };

    donateBtn.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });

    amountChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            amountChips.forEach(item => item.classList.remove('is-active'));
            chip.classList.add('is-active');
            amountInput.value = chip.dataset.amount || '';
        });
    });

    const toggleLoading = (isLoading) => {
        if (!submitBtn) return;
        submitBtn.disabled = isLoading;
        submitBtn.textContent = isLoading ? 'Menghubungkan ke Midtrans…' : 'Lanjutkan ke Pembayaran';
    };

    const requestSnapToken = async (payload) => {
        const endpoint = 'http://localhost:3001/api/create-midtrans-transaction';

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Gagal meminta token Midtrans');
        }

        return response.json();
    };

    donationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!amountInput.value || Number(amountInput.value) < 5000) {
            alert('Nominal donasi minimal Rp5.000.');
            return;
        }

        const payload = {
            name: donationForm.donorName.value.trim(),
            email: donationForm.donorEmail.value.trim(),
            amount: Number(amountInput.value),
            message: donationForm.donorMessage.value.trim(),
            campaignId: donationForm.dataset.campaignId || 'campaign-001'
        };

        toggleLoading(true);

        try {
            let token;
            try {
                const result = await requestSnapToken(payload);
                token = result?.token;
            } catch (networkError) {
                console.warn('Tidak dapat menghubungi server backend:', networkError);
                token = payload.mockToken || 'dummy-snap-token';
            }

            if (!token) {
                throw new Error('Token Midtrans tidak tersedia.');
            }

            const snap = window.snap;
            if (snap && typeof snap.pay === 'function' && token !== 'dummy-snap-token') {
                snap.pay(token, {
                    onSuccess: (result) => {
                        console.log('Pembayaran berhasil', result);
                        closeModal();
                        alert('Terima kasih! Pembayaran berhasil diproses.');
                    },
                    onPending: (result) => {
                        console.log('Pembayaran menunggu', result);
                        closeModal();
                        alert('Pembayaran kamu sedang diproses. Silakan selesaikan di halaman Midtrans.');
                    },
                    onError: (result) => {
                        console.error('Terjadi kesalahan pembayaran', result);
                        alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
                    },
                    onClose: () => {
                        console.log('Donatur menutup popup pembayaran');
                    }
                });
            } else {
                const vtwebUrl = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${token}`;
                window.location.href = vtwebUrl;
            }
        } catch (error) {
            console.error(error);
            alert('Maaf, kami tidak dapat memproses donasi saat ini. Silakan coba beberapa saat lagi.');
        } finally {
            toggleLoading(false);
        }
    });
});
