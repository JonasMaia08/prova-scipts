import { db } from "../db.js";

// Function to validate input data
const validateProductData = (data) => {
  const errors = [];

  // Validate nome
  if (!data.nome || typeof data.nome !== 'string' || data.nome.trim() === '') {
    errors.push("Nome é obrigatório.");
  }

  // Validate preco
  if (typeof data.preco !== 'number' || data.preco <= 0) {
    errors.push("Preço deve ser um número maior que 0.");
  }

  // Validate quantidade
  if (typeof data.quantidade !== 'number' || data.quantidade <= 0) {
    errors.push("Quantidade deve ser um número maior que 0.");
  }

  return errors;
};

export const getUsers = (_, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser  = (req, res) => {
  const errors = validateProductData(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const q =
    "INSERT INTO produtos(`nome`, `descricao`, `preco`, `quantidade`, `categoria`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto cadastrado com sucesso.");
  });
};

export const updateUser  = (req, res) => {
  const errors = validateProductData(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const q =
    "UPDATE produtos SET `nome` = ?, `descricao` = ?, `preco` = ?, `quantidade` = ?, `categoria` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.preco,
    req.body.quantidade,
    req.body.categoria,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteUser  = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};