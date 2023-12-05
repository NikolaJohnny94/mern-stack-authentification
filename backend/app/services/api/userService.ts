import userModel from '../../models/userModel'
import { UserSearchCriteria } from '../../enums/UserSearchCriteria.enum'

import type { User } from '../../types/User.type'

class UserService {
  createUser(body: User) {
    return userModel.create(body)
  }

  getUsers() {
    return userModel.find()
  }

  findUser(userSearchCriteria: UserSearchCriteria, searchValue: string) {
    if (userSearchCriteria === UserSearchCriteria.id) {
      return userModel.findById(searchValue)
    }

    if (userSearchCriteria === UserSearchCriteria.email) {
      return userModel.findOne({ email: searchValue }).select('+password')
    }

    if (userSearchCriteria === UserSearchCriteria.loginIdentifier) {
      return userModel
        .findOne({
          $or: [{ username: searchValue }, { email: searchValue }],
        })
        .select('+password')
    }
  }
}

export default UserService
