export const testData = {
  invalidNames: ['123', '  John  ', 'Yevhen!@#$', 'Євген'],
  invalidEmails: ['plainaddress', '@missingusername.com', 'username@.com', 'username@domain..com', 'username@domain,com', 'username@domain com','username@domain.c',],
  invalidPasswords: ['A1bc','Ab1defghijklmnop','Abcdefgh','abc12345','abc12345','12345678','AbcDefGhi'],
  validPassword: 'Abcdefgh1!',
  validName: 'Toster',
  validLastName: 'Tester',
  validEmail: `aqa-toster.tester+test${Date.now()}@example.com`
};