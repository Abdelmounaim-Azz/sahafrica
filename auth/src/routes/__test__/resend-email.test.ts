import request from 'supertest';
import { app } from '../../app';

it('Not authorized user expect 401', async () => {
  await request(app)
    .post('/api/users/resend-email')
    .send()
    .expect(401);

});
it('user authenticated,email sent expect 200 ', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/users/resend-email')
    .set('Cookie', cookie)
    .send()
    .expect(200);
});