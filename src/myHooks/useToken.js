export default function useToken () {
    const token = localStorage.getItem("token");
    return token
};