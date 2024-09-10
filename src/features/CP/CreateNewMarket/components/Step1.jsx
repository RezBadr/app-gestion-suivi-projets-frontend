import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export default function Step1({ allowed, mainObject, setMainObject, setAllowed }) {
  const theme = useTheme();
  const fileInputRef = React.useRef(null);
  const [marketTitle, setMarketTitle] = React.useState(mainObject.formData.marketName || '');
  const [marketNumber, setMarketNumber] = React.useState(mainObject.formData.marketNumber || '');
  const [companyName, setCompanyName] = React.useState(mainObject.formData.companyName || '');
  const [file, setFile] = React.useState(mainObject.file || null);
  const [fileURL, setFileURL] = React.useState(file ? URL.createObjectURL(file) : '/path/to/default/avatar.jpg');

  const handleChangeMarketTitle = (event) => {
    const value = event.target.value;
    setMarketTitle(value);
    console.log(marketTitle)
    setMainObject(prev => ({
      ...prev,
      formData: { ...prev.formData, marketName: value }
    }));
  };

  const handleChangeMarketNumber = (event) => {
    const value = event.target.value;
    setMarketNumber(value);
    setMainObject(prev => ({
      ...prev,
      formData: { ...prev.formData, marketNumber: value }
    }));
  };

  const handleChangeCompanyName = (event) => {
    const value = event.target.value;
    setCompanyName(value);
    setMainObject(prev => ({
      ...prev,
      formData: { ...prev.formData, companyName: value }
    }));
  };

  const handleChangeFile = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      if (fileURL) {
        URL.revokeObjectURL(fileURL); // Revoke the old URL
      }
      const newFileURL = URL.createObjectURL(newFile);
      setFile(newFile);
      setFileURL(newFileURL);
      setMainObject(prev => ({
        ...prev,
        file: newFile
      }));
    }
    console.log(newFile)
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  React.useEffect(() => {
    console.log('marketNumber:', marketNumber);
    console.log('marketTitle:', marketTitle);
    console.log('companyName:', companyName);
    console.log('file:', file);
  
    if (marketNumber.trim() !== '' && marketTitle.trim() !== '' && companyName.trim() !== '' && file !== null) {
      setAllowed(prev => {
        console.log('Previous allowed:', prev);
        if (!prev.includes(0)) {
          return [...prev, 0];
        }
        return prev;
      });
    }
  }, [marketNumber, marketTitle, companyName, file, setAllowed]);
  
  React.useEffect(() => {
    console.log('Updated allowed:', allowed);
  }, [allowed]);
  

  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      <Box>
        <TextField
          id="nom-marche"
          label="Le nom du marché"
          variant="standard"
          fullWidth
          sx={{ width: '40vw' }}
          value={marketTitle}
          onChange={handleChangeMarketTitle}
        />
      </Box>
      <Box>
        <TextField
          id="numero-marche"
          label="Numéreau de marché"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          fullWidth
          sx={{ width: '40vw' }}
          value={marketNumber}
          onChange={handleChangeMarketNumber}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '1%' }}>
        <TextField
          id="nom-entreprise"
          label="L'entreprise"
          variant="standard"
          fullWidth
          sx={{ width: '40vw' }}
          value={companyName}
          onChange={handleChangeCompanyName}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChangeFile}
          />
          {!file ? (
            <IconButton
              sx={{ color: theme.palette.primary.main, ml: 2 }}
              onClick={handleButtonClick}
            >
              <AddPhotoAlternateIcon />
            </IconButton>
          ) : (
            <Avatar
              alt="File Preview"
              src={fileURL}
              sx={{
                width: 56,
                height: 56,
                cursor: 'pointer',
                border: '1px solid',
                transition: 'width 0.3s ease, height 0.3s ease',
                '&:hover': {
                  width: 80,
                  height: 80,
                },
              }}
              onClick={handleButtonClick}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
