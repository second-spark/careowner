import { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './components/Dashboard';
import { PracticeProfile } from './components/PracticeProfile';
import { Settings } from './components/Settings';
import { Recommendations } from './components/Recommendations';
import { Offers } from './components/Offers';
import { Interest } from './components/Interest';
import { Buyers } from './components/Buyers';
import { BrowseBuyers } from './components/BrowseBuyers';
import { Meetings } from './components/Meetings';
import { Messages } from './components/Messages';
import { BuyerProfile } from './components/BuyerProfile';
import { DealRoom } from './components/DealRoom';
import { DealPreparation } from './components/DealPreparation';
import { OfferDetail } from './components/OfferDetail';
import { Financials } from './components/Financials';
import { Team } from './components/Team';
import { Facilities } from './components/Facilities';
import { Reviews } from './components/Reviews';
import { mockPractices } from './data/mockPractices';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  
  // Use Lakeside Animal Hospital (id: '5') as the default practice
  const myPractice = mockPractices.find(p => p.id === '5') || mockPractices[0];

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== 'buyer-profile') {
      setSelectedBuyerId(null);
    }
    if (page !== 'offer-detail') {
      setSelectedOfferId(null);
    }
  };

  const handleViewBuyer = (buyerId: string) => {
    setSelectedBuyerId(buyerId);
    setCurrentPage('buyer-profile');
  };

  const handleViewOffer = (offerId: string) => {
    setSelectedOfferId(offerId);
    setCurrentPage('offer-detail');
  };

  const getBreadcrumbs = () => {
    switch (currentPage) {
      case 'dashboard':
        return [{ label: 'Dashboard', onClick: undefined }];
      case 'practice-profile':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Practice Details', onClick: undefined }
        ];
      case 'team':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Practice Details', onClick: () => handleNavigate('practice-profile') },
          { label: 'Team', onClick: undefined }
        ];
      case 'facilities':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Practice Details', onClick: () => handleNavigate('practice-profile') },
          { label: 'Facilities', onClick: undefined }
        ];
      case 'financials':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Financials', onClick: undefined }
        ];
      case 'reviews':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Financials', onClick: () => handleNavigate('financials') },
          { label: 'Reviews', onClick: undefined }
        ];
      case 'recommendations':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Recommendations', onClick: undefined }
        ];
      case 'buyers':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: undefined }
        ];
      case 'browse-buyers':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: () => handleNavigate('buyers') },
          { label: 'Browse Buyers', onClick: undefined }
        ];
      case 'interest':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: () => handleNavigate('buyers') },
          { label: 'Interest', onClick: undefined }
        ];
      case 'offers':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: () => handleNavigate('buyers') },
          { label: 'Offers', onClick: undefined }
        ];
      case 'deal-room':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: () => handleNavigate('buyers') },
          { label: 'Deal Room', onClick: undefined }
        ];
      case 'deal-preparation':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Deal Preparation', onClick: undefined }
        ];
      case 'meetings':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: () => handleNavigate('buyers') },
          { label: 'Meetings', onClick: undefined }
        ];
      case 'buyer-profile':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: () => handleNavigate('buyers') },
          { label: 'Buyer Profile', onClick: undefined }
        ];
      case 'offer-detail':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Buyers', onClick: () => handleNavigate('buyers') },
          { label: 'Offers', onClick: () => handleNavigate('offers') },
          { label: 'Offer Details', onClick: undefined }
        ];
      case 'messages':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Messages', onClick: undefined }
        ];
      case 'documents':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Documents', onClick: undefined }
        ];
      case 'account':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'My Account', onClick: undefined }
        ];
      case 'settings':
        return [
          { label: 'Dashboard', onClick: () => handleNavigate('dashboard') },
          { label: 'Settings', onClick: undefined }
        ];
      default:
        return [{ label: 'Dashboard', onClick: undefined }];
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} onViewBuyer={handleViewBuyer} />;
      case 'practice-profile':
        return <PracticeProfile practice={myPractice} />;
      case 'team':
        return <Team practice={myPractice} />;
      case 'facilities':
        return <Facilities practice={myPractice} />;
      case 'financials':
        return <Financials practice={myPractice} />;
      case 'reviews':
        return <Reviews practice={myPractice} />;
      case 'recommendations':
        return <Recommendations />;
      case 'interest':
        return <Interest onViewBuyer={handleViewBuyer} />;
      case 'offers':
        return <Offers onViewBuyer={handleViewBuyer} onViewOffer={handleViewOffer} />;
      case 'deal-room':
        return <DealRoom onViewBuyer={handleViewBuyer} />;
      case 'deal-preparation':
        return <DealPreparation />;
      case 'buyers':
        return <Buyers onViewBuyer={handleViewBuyer} onExploreBuyers={() => handleNavigate('browse-buyers')} />;
      case 'browse-buyers':
        return <BrowseBuyers onViewBuyer={handleViewBuyer} onBack={() => handleNavigate('buyers')} />;
      case 'meetings':
        return <Meetings onViewBuyer={handleViewBuyer} />;
      case 'buyer-profile':
        if (selectedBuyerId) {
          return <BuyerProfile buyerId={selectedBuyerId} onViewOffer={handleViewOffer} />;
        }
        return (
          <div>
            <h1 className="mb-2 text-[20px] font-semibold">Buyer Not Found</h1>
            <p className="text-muted-foreground">Please select a buyer to view their profile.</p>
          </div>
        );
      case 'offer-detail':
        if (selectedOfferId) {
          return <OfferDetail offerId={selectedOfferId} onViewBuyer={handleViewBuyer} onBack={() => handleNavigate('offers')} />;
        }
        return (
          <div>
            <h1 className="mb-2 text-[20px] font-semibold">Offer Not Found</h1>
            <p className="text-muted-foreground">Please select an offer to view its details.</p>
          </div>
        );
      case 'messages':
        return <Messages onViewBuyer={handleViewBuyer} />;
      case 'documents':
        return (
          <div>
            <h1 className="mb-2 text-[20px] font-semibold">Documents</h1>
            <p className="text-muted-foreground">Manage financial documents, tax returns, and legal paperwork.</p>
          </div>
        );
      case 'account':
        return (
          <div>
            <h1 className="mb-2 text-[20px] font-semibold">My Account</h1>
            <p className="text-muted-foreground">Manage your account settings and profile information.</p>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={handleNavigate} onViewBuyer={handleViewBuyer} />;
    }
  };

  return (
    <AppLayout currentPage={currentPage} onNavigate={handleNavigate} breadcrumbs={getBreadcrumbs()}>
      {renderContent()}
    </AppLayout>
  );
}
