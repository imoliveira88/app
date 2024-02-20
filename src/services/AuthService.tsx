import axios from './../services/api'

export default class AuthService {
  /**
   * Return if a contract is first access contract
   * @param contract
   * @author Michael Douglas
   */
  async isFirstAccess(contract: String): Promise<boolean> {
    try {
      const response = await axios.get(`/api/users/check-exists/${contract}`)
      return !response.data.message
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  /**
   * get contract data
   * @param contract
   * @param cpfCnpj
   * @author Michael Douglas
   */
  async getContractDataByCpfCnpj(
    contract: String,
    cpfCnpj: String
  ): Promise<any> {
    try {
      const response = await axios.get(
        `/api/users/get-contract/${contract}/${cpfCnpj}`
      )
      return response.data
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  /**
   * Store new user password
   * @param data
   * @param contract
   */
  async storeNewPassword(password: String, contract: String): Promise<any> {
    try {
      const response = await axios.post(`/api/new-password/${contract}`, {
        password: password,
      })
      return response.data
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  /**
   * Update user password
   * @param password
   * @author Michael Douglas
   */
  async updatePassword(password: String): Promise<any> {
    try {
      const response = await axios.post('/api/user', { password: password })
      return response.data
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async deleteUser(): Promise<any> {
    try {
      await axios.delete('/api/user')
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
