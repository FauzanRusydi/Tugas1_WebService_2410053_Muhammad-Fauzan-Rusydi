const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


let biodataList = [
    {
        id: 1,
        nama: "Muhammad Fauzan Rusydi",
        umur: 20,
        alamat: "Tangerang",
        pekerjaan: "Mahasiswa"
    }
];

let nextId = 2;

app.get('/api/biodata', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Berhasil mengambil seluruh data biodata",
        data: {
            biodata: biodataList
        }
    });
});

app.get('/api/biodata/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const biodata = biodataList.find(item => item.id === id);

    if (!biodata) {
        return res.status(404).json({
            status: "fail",
            message: `Biodata dengan ID ${id} tidak ditemukan`,
            data: null
        });
    }

    res.status(200).json({
        status: "success",
        message: `Berhasil mengambil detail biodata dengan ID ${id}`,
        data: {
            biodata
        }
    });
});

app.post('/api/biodata', (req, res) => {
    const { nama, umur, alamat, pekerjaan } = req.body;

    if (!nama || umur === undefined || !alamat || !pekerjaan) {
        return res.status(400).json({
            status: "fail",
            message: "Validasi gagal: Semua field (nama, umur, alamat, pekerjaan) wajib diisi!",
            data: null
        });
    }

    const newBiodata = {
        id: nextId++,
        nama,
        umur: Number(umur),
        alamat,
        pekerjaan
    };

    biodataList.push(newBiodata);

    res.status(201).json({
        status: "success",
        message: "Biodata berhasil ditambahkan",
        data: {
            biodata: newBiodata
        }
    });
});

app.put('/api/biodata/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = biodataList.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: `Biodata dengan ID ${id} tidak ditemukan untuk diperbarui`,
            data: null
        });
    }

    const { nama, umur, alamat, pekerjaan } = req.body;

    if (!nama && umur === undefined && !alamat && !pekerjaan) {
        return res.status(400).json({
            status: "fail",
            message: "Validasi gagal: Setidaknya satu field harus diisi untuk pembaruan data",
            data: null
        });
    }

    biodataList[index] = {
        id,
        nama: nama !== undefined ? nama : biodataList[index].nama,
        umur: umur !== undefined ? Number(umur) : biodataList[index].umur,
        alamat: alamat !== undefined ? alamat : biodataList[index].alamat,
        pekerjaan: pekerjaan !== undefined ? pekerjaan : biodataList[index].pekerjaan
    };

    res.status(200).json({
        status: "success",
        message: `Biodata dengan ID ${id} berhasil diperbarui`,
        data: {
            biodata: biodataList[index]
        }
    });
});

app.delete('/api/biodata/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = biodataList.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: `Biodata dengan ID ${id} tidak ditemukan untuk dihapus`,
            data: null
        });
    }

    const deletedBiodata = biodataList.splice(index, 1)[0];

    res.status(200).json({
        status: "success",
        message: `Biodata dengan ID ${id} berhasil dihapus`,
        data: {
            biodata: deletedBiodata
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server RESTful API berjalan di http://localhost:${PORT}`);
});