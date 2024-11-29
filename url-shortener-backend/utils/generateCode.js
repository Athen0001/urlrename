// Random code generator to switch the URL
const generateCode = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset[randomIndex];
  }
  return code;
};

export default generateCode;

/* this code has 218 trillions of combinations codes, with 66.839 codes representing 1% chance of colision,
  and over 1.4 million codes represents 99% chance of colision. If a colision happen, the controller let the postgres indentify 
  with it own indexes the uniqueness, and simply try other code if the db return it duplicity error. */
