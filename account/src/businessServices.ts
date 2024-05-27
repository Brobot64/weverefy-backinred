import businessModel from './models/business';
import { IBusiness } from './models/business'; 

export const createBusiness = async (data: Partial<IBusiness>): Promise<IBusiness> => {
    try {
        const business = new businessModel(data);
        return await business.save();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getBusinessById = async (id: string): Promise<IBusiness | null> => {
    try {
        return await businessModel.findById(id);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateBusiness = async (id: string, data: Partial<IBusiness>): Promise<IBusiness | null> => {
    try {
        return await businessModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteBusiness = async (id: string): Promise<IBusiness | null> => {
    try {
        return await businessModel.findByIdAndDelete(id);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getAllBusinesses = async (): Promise<IBusiness[]> => {
    try {
        return await businessModel.find();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getBusinessByUserId = async (userId: string): Promise<IBusiness | null> => {
    try {
        return await businessModel.findOne({ user: userId });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
