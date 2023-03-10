export const validate = (email, password, data) => {
    var match = data.some(x=> x.password === password && x.email == email);
    return match;
}