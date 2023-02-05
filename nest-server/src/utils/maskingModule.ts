export function maskingEmail(email: string) {
  const strLength = email.split('@')[0].length - 3;
  const userEmail = email.replace(
    new RegExp('.(?=.{0,' + strLength + '}@)', 'g'),
    '*',
  );
  return userEmail;
}
