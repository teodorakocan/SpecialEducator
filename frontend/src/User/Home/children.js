import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader';

export const children = getChildren()

function getChildren() {
    var children = [];
    axiosInstance.get('/authUser/allChildren', { headers: authHeader() })
        .then((response) => {
            if (response.data.status === 'success') {
                response.data.children.forEach(child => {
                    children.push(child);
                })
            }
        });
    return children;
}
