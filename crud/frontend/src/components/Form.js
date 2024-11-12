import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const nomeRef = useRef();
  const descricaoRef = useRef();
  const precoRef = useRef();
  const quantidadeRef = useRef();
  const categoriaRef = useRef();

  useEffect(() => {
    if (onEdit) {
      nomeRef.current.value = onEdit.nome;
      descricaoRef.current.value = onEdit.descricao;
      precoRef.current.value = onEdit.preco;
      quantidadeRef.current.value = onEdit.quantidade;
      categoriaRef.current.value = onEdit.categoria;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nome = nomeRef.current.value.trim();
    const descricao = descricaoRef.current.value.trim();
    // Replace comma with dot for float parsing
    const preco = parseFloat(precoRef.current.value.replace(',', '.'));
    const quantidade = parseInt(quantidadeRef.current.value);
    const categoria = categoriaRef.current.value.trim();

    // Validation
    const errors = []; // Initialize errors array
    if (!nome) {
      return toast.warn("Nome é obrigatório!");
    }
    if (isNaN(preco) || preco <= 0) {
      errors.push("Preço deve ser um número maior que 0.");
    }
    if (isNaN(quantidade) || quantidade <= 0) {
      errors.push("Quantidade deve ser um número inteiro maior que 0!");
    }

    // If there are errors, display them
    if (errors.length > 0) {
      errors.forEach(error => toast.warn(error));
      return;
    }

    try {
      if (onEdit) {
        await axios.put("http://localhost:8800/" + onEdit.id, {
          nome,
          descricao,
          preco,
          quantidade,
          categoria,
        });
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800", {
          nome,
          descricao,
          preco,
          quantidade,
          categoria,
        });
        toast.success("Usuário criado com sucesso!");
      }

      // Clear input fields after submission
      nomeRef.current.value = "";
      descricaoRef.current.value = "";
      precoRef.current.value = "";
      quantidadeRef.current.value = "";
      categoriaRef.current.value = "";

      setOnEdit(null);
      getUsers();
    } catch (error) {
      toast.error("Erro ao salvar usuário: " + error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input ref={nomeRef} name="nome" required />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input ref={descricaoRef} name="descricao" />
      </InputArea>
      <InputArea>
        <Label>Preço (R$)</Label>
        <Input ref={precoRef} name="preco" type="number" step="0.01" required />
      </InputArea>
      <InputArea>
        <Label>Quantidade</Label>
        <Input ref={quantidadeRef} name="quantidade" type="number" required />
      </InputArea>
      <InputArea>
        <Label>Categoria</Label>
        <Input ref={categoriaRef} name="categoria" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;