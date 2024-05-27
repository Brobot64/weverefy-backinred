import { Request, Response } from 'express';
import * as businessService from './businessServices'

export const createBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const business = await businessService.createBusiness(req.body);
        res.status(201).json(business);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getBusinessById = async (req: Request, res: Response): Promise<void> => {
    try {
        const business = await businessService.getBusinessById(req.params.id);
        if (!business) res.status(404).json({ error: 'Business not found' });
        res.status(200).json(business);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const business = await businessService.updateBusiness(req.params.id, req.body);
        if (!business) res.status(404).json({ error: 'Business not found' });
        res.status(200).json(business);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteBusiness = async (req: Request, res: Response): Promise<void> => {
    try {
        const business = await businessService.deleteBusiness(req.params.id);
        if (!business) res.status(404).json({ error: 'Business not found' });
        res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllBusinesses = async (_req: Request, res: Response): Promise<void> => {
    try {
        const businesses = await businessService.getAllBusinesses();
        res.status(200).json(businesses);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


export const getBusinessByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
        const business = await businessService.getBusinessByUserId(req.params.userId);
        if (!business) res.status(404).json({ error: 'Business not found' });
        res.status(200).json(business);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
