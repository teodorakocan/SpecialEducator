import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';

export const children = getChildren()

function getChildren() {
    var children = [];
    axiosInstance.get('/authUser/allChildren', { headers: authHeader() })
        .then((response) => {
            if (response.data.status === 'success') {
                response.data.children.forEach(child => {
                    var childrenInfo = {};
                    childrenInfo['text'] = child.name + ' ' + child.lastName;
                    childrenInfo['id'] = child.idChild;
                    childrenInfo['color'] = '#ff8533';
                    childrenInfo['avatar'] = 'http://localhost:9000/' + child.image;
                    children.push(childrenInfo);
                })
            }
        });
    return children;
}
