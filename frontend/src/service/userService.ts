import { User } from "../types/User";
import api from "./api";

class UsersService {
  getTaskLists() {
      throw new Error('Method not implemented.');
  }
  createTaskList(arg0: { name: string; }) {
      throw new Error('Method not implemented.');
  }
  deleteTaskList(listId: string) {
      throw new Error('Method not implemented.');
  }
  async get(): Promise<User[]> {
    const { data } = await api.get("/user");
    return data;
  }

  async post(props: {
    name: string;
    email: string;
    password: string;
    isLogged: boolean;
  }): Promise<any> {
    const { data } = await api.post("/user", props);
    console.log(data)
    return data;
  }

  async put(props: {
    id: string;
    name: string;
    email: string;
    password: string;
    isLogged: boolean;
  }): Promise<any> {
    const { data } = await api.put("/user", props);
    return data;
  }

  async listById(id: string) {
    const { data } = await api.get(`/user/${id}`);
    return data;
  }
}

const service = new UsersService();
export default service;