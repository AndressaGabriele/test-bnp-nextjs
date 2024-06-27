import { NextApiRequest, NextApiResponse } from 'next';
import { IUser, IUserCreate } from '@/types/user';

const users: IUser[] = [];

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { name, email }: IUserCreate = req.body;

		if (!name || !email) {
			return res.status(400).json({ message: 'Name and Email are required' });
		}

		const newUser: IUser = {
			id: users.length + 1,
			name,
			email,
		};

		users.push(newUser);
		return res.status(201).json(newUser);
	}

	return res.status(405).json({ message: 'Method Not Allowed' });
};
