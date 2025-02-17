const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllKaryawan = async (req, res) => {
  try {
    const data = await prisma.karyawan.findMany({
      include: {
        jabatan: true
      }
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({error: "Internal server error!"})
  }
}

const getKaryawanById = async (req, res) => {
  const id = req.params.id
  try {
    const data = await prisma.karyawan.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        jabatan: true
      }
    });
    res.status(200).send(data)
  } catch (error) { 
    console.log(error)
    res.status(500).send({error: "Internal server error!"})
  }
}

const addKaryawan = async (req, res) => {
  try {
    const { nip, nama, telp, alamat, jabatanId } = req.body;
    const data = await prisma.karyawan.create({
      data: {
        nip: nip,
        nama: nama,
        telp: telp,
        alamat: alamat,
        jabatanId: parseInt(jabatanId)
      }
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error)
    res.status(500).send({error: "Internal sever error!"});
  }
}

const editKaryawan = async (req, res) => {
  const id = req.params.id;
  const value = req.body;
  try {
    const data = await prisma.karyawan.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nama: value.nama,
        alamat: value.alamat,
        telp: value.telp,
      }
    })
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send({error: "Internal server error!"});
  }
}

const deleteKaryawan = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await prisma.karyawan.delete({
      where: {
        id: id
      }
    });
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({error: "Internal server error!"})
  }
}

module.exports = {
  getAllKaryawan,
  getKaryawanById,
  addKaryawan,
  editKaryawan,
  deleteKaryawan,
};
