import { axiosWithAuth } from "@/api/interceptors"
import { IUser, TypeUserForm } from "@/types/auth.types"

export interface IProfileResponse {
  user: IUser
  statistics: {
    label: string
    value: string
  }[]
}

class UserService {
  private BASE_URL = '/user/profile'
  async getProfile() {
    try {
      const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error);

    }

  }
  async update(data: TypeUserForm) {
    const response = await axiosWithAuth.put(this.BASE_URL, data)
    return response.data
  }
}

export const userService = new UserService()