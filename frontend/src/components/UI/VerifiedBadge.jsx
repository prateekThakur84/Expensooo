// VerifiedBadge.jsx

import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

export const VerifiedBadge = ({ className }) => (
  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 ${className}`}>
    <CheckCircle className="w-5 h-5" />
    {/* <span className="text-sm font-medium">Verified</span> */}
  </div>
);

export const SecurityBadge = ({ className }) => (
  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 ${className}`}>
    <Shield className="w-4 h-4" />
    <span className="text-sm font-medium">Secure Account</span>
  </div>
);

// You would export one as the default if needed, for example:
export default VerifiedBadge;