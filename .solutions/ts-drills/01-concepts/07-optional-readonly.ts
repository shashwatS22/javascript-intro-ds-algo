interface Profile {
  readonly id: number;
  name: string;
  nickname?: string;
}

const profile: Profile = { id: 1, name: 'Riya' };

console.log(profile.name);