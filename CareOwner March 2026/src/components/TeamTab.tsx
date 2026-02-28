import { useState } from 'react';
import { Practice, Doctor } from '../types/practice';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from './ui/sheet';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { GraduationCap, Briefcase, ShieldCheck, AlertTriangle, Plus, Edit, Trash2, Calendar, DollarSign, Clock, HeartPulse, CheckCircle2 } from 'lucide-react';

interface TeamTabProps {
  practice: Practice;
}

export function TeamTab({ practice }: TeamTabProps) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [newMember, setNewMember] = useState<Partial<Doctor>>({
    name: '',
    title: '',
    photo: '',
    bio: '',
    age: undefined,
    school: '',
    yearsExperience: undefined,
    license: '',
    complaints: 0,
    professionalExperience: [''],
  });

  // Calculate age from date of birth
  const calculateAge = (dob: string): number | undefined => {
    if (!dob) return undefined;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate years of experience from professional experience entries
  const calculateYearsOfExperience = (experiences: string[]): number => {
    let totalYears = 0;
    experiences.forEach(exp => {
      // Try to extract years from patterns like "(5 years)", "5 years", "(2015-2020)", etc.
      const yearMatch = exp.match(/(\d+)\s*years?/i);
      const rangeMatch = exp.match(/\((\d{4})-(\d{4})\)/);
      
      if (yearMatch) {
        totalYears += parseInt(yearMatch[1]);
      } else if (rangeMatch) {
        const startYear = parseInt(rangeMatch[1]);
        const endYear = parseInt(rangeMatch[2]);
        totalYears += endYear - startYear;
      }
    });
    return totalYears;
  };

  // Update age when date of birth changes
  const handleDateOfBirthChange = (dob: string) => {
    setDateOfBirth(dob);
    const calculatedAge = calculateAge(dob);
    setNewMember(prev => ({ ...prev, age: calculatedAge }));
  };

  const handleInputChange = (field: keyof Doctor, value: any) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, value: string) => {
    const updatedExperience = [...(newMember.professionalExperience || [''])];
    updatedExperience[index] = value;
    const calculatedYears = calculateYearsOfExperience(updatedExperience);
    setNewMember(prev => ({ 
      ...prev, 
      professionalExperience: updatedExperience,
      yearsExperience: calculatedYears 
    }));
  };

  const addExperienceField = () => {
    setNewMember(prev => ({
      ...prev,
      professionalExperience: [...(prev.professionalExperience || ['']), '']
    }));
  };

  const handleSaveMember = () => {
    // In a real app, this would save to the backend
    console.log('Saving new team member:', newMember);
    setIsAddMemberOpen(false);
    // Reset form
    setDateOfBirth('');
    setNewMember({
      name: '',
      title: '',
      photo: '',
      bio: '',
      age: undefined,
      school: '',
      yearsExperience: undefined,
      license: '',
      complaints: 0,
      professionalExperience: [''],
    });
  };

  const handleEditMember = (doctorId: string) => {
    console.log('Edit member:', doctorId);
    // In a real app, this would open an edit form
  };

  const handleDeleteMember = (doctorId: string) => {
    console.log('Delete member:', doctorId);
    // In a real app, this would show a confirmation dialog and delete
  };
  return (
    <div className="space-y-6">
      {/* Team Summary - Moved to Top */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <h2>Team Summary</h2>
        <Sheet open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Team Member
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add Team Member</SheetTitle>
              <SheetDescription>
                Enter the details for the new team member below.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6 px-[17px] py-[24px]">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3>Basic Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newMember.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Senior Veterinarian"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => handleDateOfBirthChange(e.target.value)}
                  />
                  {newMember.age !== undefined && (
                    <p className="text-sm text-muted-foreground">Calculated age: {newMember.age} years</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo URL</Label>
                  <Input
                    id="photo"
                    value={newMember.photo}
                    onChange={(e) => handleInputChange('photo', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={newMember.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Brief description of specialties and experience..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Education & License */}
              <div className="space-y-4">
                <h3>Education & License</h3>
                <div className="space-y-2">
                  <Label htmlFor="school">Education</Label>
                  <Input
                    id="school"
                    value={newMember.school}
                    onChange={(e) => handleInputChange('school', e.target.value)}
                    placeholder="University of Veterinary Medicine"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input
                    id="license"
                    value={newMember.license}
                    onChange={(e) => handleInputChange('license', e.target.value)}
                    placeholder="IL-VET-2015-1234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complaints">Number of Complaints</Label>
                  <Input
                    id="complaints"
                    type="number"
                    value={newMember.complaints}
                    onChange={(e) => handleInputChange('complaints', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Professional Experience */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3>Professional Experience</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addExperienceField}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Entry
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Include years in format: "Position at Organization (5 years)" or "Position (2015-2020)"
                </p>
                {newMember.professionalExperience?.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`experience-${index}`}>Experience {index + 1}</Label>
                    <Input
                      id={`experience-${index}`}
                      value={exp}
                      onChange={(e) => handleExperienceChange(index, e.target.value)}
                      placeholder="Senior Veterinarian at ABC Clinic (5 years)"
                    />
                  </div>
                ))}
                {newMember.yearsExperience !== undefined && newMember.yearsExperience > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Total calculated experience: {newMember.yearsExperience} years
                  </p>
                )}
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveMember}>
                Save Team Member
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Doctors</p>
            <p className="text-2xl">{practice.team.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Experience</p>
            <p className="text-2xl">
              {Math.round(
                practice.team.reduce((sum, doc) => sum + doc.yearsExperience, 0) / 
                practice.team.length
              )} years
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Support Staff</p>
            <p className="text-2xl">{practice.technicians?.length || practice.numberOfTechnicians}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Payroll Integration</p>
            <p className="text-2xl">ADP</p>
            <Badge className="bg-green-600 text-white mt-2">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          </div>
        </div>
      </Card>

      {/* Doctors */}
      <div>
        <h3 className="mb-4">Doctors</h3>
        <div className="grid grid-cols-1 gap-6">
          {practice.team.map((doctor) => (
          <Card key={doctor.id} className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 rounded-lg">
                  <AvatarImage src={doctor.photo} alt={doctor.name} className="object-cover" />
                  <AvatarFallback className="rounded-lg text-2xl">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3>{doctor.name}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditMember(doctor.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteMember(doctor.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{doctor.title}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">Age {doctor.age}</Badge>
                    <Badge variant="outline">{doctor.yearsExperience} years experience</Badge>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground">{doctor.bio}</p>

                {/* Education */}
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Education</p>
                    <p className="text-sm text-muted-foreground">{doctor.school}</p>
                  </div>
                </div>

                {/* Professional Experience */}
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm mb-2">Professional Experience</p>
                    <ul className="space-y-1">
                      {doctor.professionalExperience.map((exp, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {exp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* License Information */}
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">License Information</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-muted-foreground">License #: {doctor.license}</p>
                      {doctor.complaints === 0 ? (
                        <Badge className="bg-green-600 text-white">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          No Complaints
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600 text-white">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {doctor.complaints} Complaint{doctor.complaints > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        </div>
      </div>

      {/* Support Staff */}
      {practice.technicians && practice.technicians.length > 0 && (
        <div>
          <h3 className="mb-4">Support Staff</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {practice.technicians.map((tech) => (
              <Card key={tech.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4>{tech.name}</h4>
                      <p className="text-sm text-muted-foreground">{tech.role}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => console.log('Edit staff member:', tech.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Started:</span>
                      <span>{new Date(tech.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Salary:</span>
                      <span>${tech.hourlySalary}/hr</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Hours:</span>
                      <span>{tech.hoursPerWeek} hrs/week</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <HeartPulse className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Insurance:</span>
                      <Badge variant={tech.hasHealthInsurance ? 'default' : 'secondary'} className="text-xs">
                        {tech.hasHealthInsurance ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
