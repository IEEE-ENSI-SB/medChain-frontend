// app/components/UserAvatarDropdown.tsx
import Image from 'next/image';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, Typography } from '@mui/material';

const UserAvatarDropdown: React.FC = () => {
  const [dialog, setDialog] = useState<boolean>(false);

  const handleChangePassword = () => {
    // Logic for changing the password would go here
    console.log('Change password clicked');
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image 
                src="/avatar.jpeg" 
                alt="User avatar" 
                className="object-cover"
                width={80}
                height={80}
              />
            </div>
            <span className="text-sm font-medium text-green-500">Hello, Daulat</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 bg-white shadow-lg rounded-lg p-2 mt-2"
        >
          <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md" onClick={() => setDialog(true)}>
            <User className="w-4 h-4 text-gray-800" />
            <span className='text-gray-800'>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <Settings className="w-4 h-4 text-gray-800" />
            <span className='text-gray-800'>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-red-100 rounded-md text-red-600">
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle>Admin Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1"><strong>First Name:</strong> Daulat</Typography>
          <Typography variant="body1"><strong>Last Name:</strong> Singh</Typography>
          <Typography variant="body1"><strong>Session Password:</strong> ••••••••</Typography>

          <Divider style={{ margin: '20px 0' }} />

          <Typography variant="body2" color="textSecondary">
            You are logged in as an admin. Ensure your information is correct before continuing.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePassword} color="primary" variant="contained">
            Change Password
          </Button>
          <Button onClick={() => setDialog(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserAvatarDropdown;
