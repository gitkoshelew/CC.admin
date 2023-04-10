export interface FeatureFlagsInterface {
  id: number;
  isOrderEditingEnabled: string;
  description: string;
  adminPortalFeatureStatus: boolean;
  userPortalFeatureStatus: boolean;
  mobilePortalFeatureStatus: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface CreateFeatureFlagModelInterface {
  isOrderEditingEnabled: string;
  description: string;
}

export interface EditFeatureFlagModelInterface {
  isOrderEditingEnabled?: string;
  description?: string;
  adminPortalFeatureStatus?: boolean;
  userPortalFeatureStatus?: boolean;
  mobilePortalFeatureStatus?: boolean;
}
