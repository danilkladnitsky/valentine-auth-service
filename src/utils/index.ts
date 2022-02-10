const jwt = require('jsonwebtoken');
import User from 'src/entities/user.entity';

export const generateBearerToken = (user: Partial<User>) => {
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
      algorithm: 'HS384',
    },
  );

  return token;
};
