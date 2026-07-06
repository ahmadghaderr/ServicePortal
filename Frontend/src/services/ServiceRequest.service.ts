import axios from 'axios';
import type { ServiceRequest } from '../types/Home.type';

export const createServiceRequest = async (serviceRequest: ServiceRequest) => {
    try {
        const response = await axios.post('http://localhost:3000/api/requests', serviceRequest);
        return response.data;
    } catch (error) {
        console.error('Error creating service request:', error);
        throw error;
    }
};

export const getServiceRequests = async (title?: string, department?: string, status?: string) => {
    try {
        const response = await axios.get('http://localhost:3000/api/requests', {
            params: { title, department, status }
        });  
        return response.data;
    } catch (error) {
        console.error('Error fetching service requests:', error);
        throw error;
    }
};

export const getServiceRequestById = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/requests/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching service request by id:', error);
        throw error;
    }
};

export const updateServiceRequest = async (id: number, updatedRequest: ServiceRequest) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/requests/${id}`, updatedRequest);
        return response.data;
    } catch (error) {
        console.error('Error updating service request:', error);
        throw error;
    }        
};

export const cancelServiceRequest = async (id: number) => {
    try {
        const response = await axios.patch(`http://localhost:3000/api/requests/${id}/cancel`);
        return response.data;
    } 
    catch (error) {
        console.error('Error canceling service request:', error);
        throw error;
    }
};

export const deleteServiceRequest = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/requests/${id}`);
        return response.data;
    } 
    catch (error) {
        console.error('Error deleting service request:', error);
        throw error;
    }
};