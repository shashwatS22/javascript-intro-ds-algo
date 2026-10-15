interface User {
  name: string;
  age: number;
}

type UserUpdate = Partial<User>;

const update: UserUpdate = { nickname: 'Ri' };

console.log(update.nickname);