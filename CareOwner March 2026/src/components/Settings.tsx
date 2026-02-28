import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Integrations } from './Integrations';

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div>
      <h1 className="mb-6 text-[20px] font-semibold">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="space-y-6">
            <p className="text-muted-foreground">Configure your general practice settings and preferences.</p>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="space-y-6">
            <p className="text-muted-foreground">Manage users and their roles within your practice.</p>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <Integrations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
