import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px 0; /* Add vertical margin */
  word-break: break-all;
`;

const Container = styled.div`
  padding: 20px; /* Add padding to the container */
  margin: 0 auto; /* Center the container */
  max-width: 1200px; /* Optional: Limit the max width of the container */
  width: 100%;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  width: ${(props) => (props.width ? props.width : "auto")}; /* Allow width to be set for Th as well */

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Container>
      <Table>
        <Thead>
          <Tr>
            <Th width="25%">Nome</Th>
            <Th width="30%">Descrição</Th>
            <Th width="15%">Preço</Th>
            <Th width="15%">Quantidade</Th>
            <Th width="15%">Categoria</Th>
            <Th width="5%"></Th> 
            <Th width="5%"></Th> 
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              <Td width="25%">{item.nome}</Td>
              <Td width="30%">{item.descricao}</Td>
              <Td width="15%">{item.preco}</Td> 
              <Td width="15%">{item.quantidade}</Td> 
              <Td width="15%">{item.categoria}</Td> 
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Grid;