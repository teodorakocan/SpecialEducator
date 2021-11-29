import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import axiosInstance from '../serverConnection/axios';
import { authHeader } from '../serverConnection/authHeader';

const useChildData = (childId) =>{
    const [child, setChild] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getChildData();
    }, [childId]);

    const getChildData = async () => {
        var childData = []
        axiosInstance.get('/authUser/getChildData', {
            headers: authHeader(),
            params: {
                childId: childId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    var dateOfBirth = response.data.child[0].dateofBirth.split('T');
                    var correctDateOfBirth = dateOfBirth[0].split('-');
                    var childInfo = {};
                    childInfo['name'] = response.data.child[0].name + ' ' + response.data.child[0].lastName;
                    childInfo['idChild'] = response.data.child[0].idChild;
                    childInfo['dateOfBirth'] = correctDateOfBirth[2] + '.' + correctDateOfBirth[1] + '.' + correctDateOfBirth[0] + '.';
                    childInfo['image'] = 'http://localhost:9000/' + response.data.child[0].image;
                    childData.push(childInfo);

                    setChild(childData);
                    setAppointments(response.data.appointments);
                }
            }).catch((error) => {
                if(typeof error.response === 'undefined'){
                    navigate('/notFound');
                }else if (error.response.status === 403) {
                    navigate('/notAuthenticated');
                } else {
                    navigate('/notFound');
                }
            })
    }

    return [child, appointments];
}

export default useChildData;