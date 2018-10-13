let member = {
  MEMBER_FIND (state: any, members: Array<Object>) {
    state.members = members
  },
  MEMBER_INSERT (state: any, members: Array<Object>) {
    state.members = [...state.members, ...members]
  }
}

export default member
