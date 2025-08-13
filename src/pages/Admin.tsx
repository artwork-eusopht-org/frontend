import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Mail,
  Phone,
  Building,
  Eye,
  Edit,
  MoreHorizontal,
  Star
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockExhibitors = [
  {
    id: 1,
    name: 'Judy',
    contact: 'Judy',
    email: 'Judy@artisangallery.com',
    phone: '+1 (555) 123-4567',
    category: 'Art & Design',
    status: 'Verified',
    admin: 1,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b25085ce?w=150&h=150&fit=crop&crop=face',
  },
  // {
  //   id: 2,
  //   name: 'TechStart Solutions',
  //   contact: 'Michael Chen',
  //   email: 'mike@techstart.com',
  //   phone: '+1 (555) 234-5678',
  //   category: 'Technology',
  //   status: 'Active',
  //   exhibitions: 7,
  //   rating: 4.9,
  //   avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  // },
  // {
  //   id: 3,
  //   name: 'Green Living Co.',
  //   contact: 'Emily Rodriguez',
  //   email: 'emily@greenliving.com',
  //   phone: '+1 (555) 345-6789',
  //   category: 'Sustainability',
  //   status: 'Pending',
  //   exhibitions: 2,
  //   rating: 4.6,
  //   avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  // },
  // {
  //   id: 4,
  //   name: 'Fashion Forward',
  //   contact: 'James Wilson',
  //   email: 'james@fashionforward.com',
  //   phone: '+1 (555) 456-7890',
  //   category: 'Fashion',
  //   status: 'Verified',
  //   exhibitions: 5,
  //   rating: 4.7,
  //   avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  // },
];

export default function Exhibitors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredExhibitors = mockExhibitors.filter((exhibitor) => {
    const matchesSearch = exhibitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exhibitor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exhibitor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || exhibitor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      

      {/* Filters */}
      

      {/* Exhibitors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExhibitors.map((exhibitor) => (
          <Card key={exhibitor.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={exhibitor.avatar} alt={exhibitor.contact} />
                    <AvatarFallback>{exhibitor.contact.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{exhibitor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{exhibitor.contact}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">


              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="w-4 h-4" />
                  <span>{exhibitor.category}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{exhibitor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{exhibitor.phone}</span>
                </div>
              </div>
              <div className="flex justify-end">
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExhibitors.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Admin found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== 'All' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first admin'
            }
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Admin
          </Button>
        </div>
      )}
    </div>
  );
}