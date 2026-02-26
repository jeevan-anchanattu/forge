import { StateCreator } from 'zustand';
import { Organization, OrgMember, SubscriptionTier } from '@/shared/types';

export interface OrgSlice {
    org: Organization | null;
    members: OrgMember[];
    setOrg: (org: Organization | null) => void;
    setMembers: (members: OrgMember[]) => void;
    checkFeature: (feature: string) => boolean;
}

export const createOrgSlice: StateCreator<OrgSlice> = (set, get) => ({
    org: null,
    members: [],
    setOrg: (org) => set({ org }),
    setMembers: (members) => set({ members }),
    checkFeature: (feature) => {
        const org = get().org;
        if (!org) return false;
        return !!org.featureOverrides[feature];
    },
});
