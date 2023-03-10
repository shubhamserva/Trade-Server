import bcrypt from 'bcrypt';
/*

Copyright (c) 2019 - present AppSeed.us

*/
import express from 'express';
import Joi from 'joi';
import { checkToken } from '../config/safeRoutes';
import { logoutUser } from '../controllers/logout.controller';
import { connect } from '../server/connect';
import { validate } from '../helpers/helpers';

// eslint-disable-next-line new-cap
const router = express.Router();
// Route: <HOST>:PORT/api/users/

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(4).max(15)
    .optional(),
  password: Joi.string().required(),
});

router.post('/register', async (req,resp ) => {
    
  const { username, email, password } = req.body;
  console.log(username,email,password)
  const client = await connect();
  const users = await client.query('SELECT * FROM public.user', (err: any, res: any) => {
        if (err) {
          console.error('ERRRR',err);
        } else {
          const data = res.rows;
         const query1 = {
          text:'INSERT INTO public.user (username,email,password,user_role) VALUES($1,$2,$3,$4)',
          values: [username, email, password,"admin"]
         }
          const ress = data.some(obj => obj.email === email)
            if (ress) {
              resp.json({ success: false, msg: 'Email already exists' });
              return
            } else {
              bcrypt.genSalt(10, (_err, salt) => {
                bcrypt.hash(password, salt).then((hash) => {       
                  client.query(query1, (err: any, res: any) => {
                    if (err) {
                      console.error('ERRRR',err);
                    } else {
                      resp.json({ success: true, userID: '', msg: 'The user was successfully registered' });
                    }
                  });
                });
              });
            }
        }
      });
});

router.post('/login', async (req, resp) => {

  const { email } = req.body;
  const { password } = req.body;

  const client = await connect();
  const users = await client.query('SELECT * FROM public.user', (err: any, res: any) => {
    if (err) {
      console.error('ERRRR',err);
    } else {
      const data = res.rows;
      const ress = data.some(obj => obj.email === email)
      const val1 = validate(email, password, data);
        if (!ress) {
 
          resp.json({ success: false, msg: 'Email does not exists' });
          return
        } 
        else if (val1) {
          resp.json({ success: true, userID: '', msg: 'correct' });
        }
  };
});
});

router.post('/logout', checkToken, logoutUser);

router.post('/checkSession', checkToken, (_req, res) => {
  res.json({ success: true });
});

router.post('/all', checkToken, (_req, res) => {
  // const userRepository = connection!.getRepository(User);

  // userRepository.find({}).then((users) => {
  //   users = users.map((item) => {
  //     const x = item;
  //     (x as { password: string | undefined }).password = undefined;
  //     return x;
  //   });
  //   res.json({ success: true, users });
  // }).catch(() => res.json({ success: false }));
});

router.post('/edit', checkToken, (req, res) => {
  const { userID, username, email } = req.body;

  // const userRepository = connection!.getRepository(User);

  // userRepository.find({ id: userID }).then((user) => {
  //   if (user.length === 1) {
  //     const query = { id: user[0].id };
  //     const newvalues = { username, email };
  //     userRepository.update(query, newvalues).then(
  //       () => {
  //         res.json({ success: true });
  //       },
  //     ).catch(() => {
  //       res.json({ success: false, msg: 'There was an error. Please contract the administrator' });
  //     });
  //   } else {
  //     res.json({ success: false, msg: 'Error updating user' });
  //   }
  // });
});

// Used for tests (nothing functional)
router.get('/testme', (_req, res) => {
  res.status(200).json({ success: true, msg: 'all good' });
});


export default router; 
