import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateMarket, fetchMarketWithUsersById } from '../../features/CP/CreateNewMarket/services';

const UpdateMarket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve marketId from location state
  const { state } = location;
  const marketId = state?.marketId;
  const [loadingfetch, setLoadingfetch] = React.useState(false);
  const fileInputRef = React.useRef(null);
  
  const [mainObject, setMainObject] = React.useState({
    formData: {
      marketName: '',
      marketNumber: '',
      companyName: '',
      usersRole: {
        QUALITICIEN: '',
        CHEFDEQUALITE: '',
        CHEFDELOT: '',
        TECHNICIENDETRAVAUX: '',
      }
    },
    file: null
  });

  const [fileURL, setFileURL] = React.useState('/path/to/default/avatar.jpg');

  React.useEffect(() => {
    const fetchMarketData = async () => {
      setLoadingfetch(true);
      try {
        const response = await fetchMarketWithUsersById(marketId);
        console.log('Fetched Market Data:', response.data);
  
        // Transform the response data
        const transformedRoles = {
          QUALITICIEN: response.data.usersRole["[Role(roleId=7, authority=QUALITICIEN)]"] || '',
          CHEFDEQUALITE: response.data.usersRole["[Role(roleId=5, authority=CHEFDEQUALITE)]"] || '',
          CHEFDELOT: response.data.usersRole["[Role(roleId=6, authority=CHEFDELOT)]"] || '',
          TECHNICIENDETRAVAUX: response.data.usersRole["[Role(roleId=4, authority=TECHNICIENDETRAVAUX)]"] || ''
        };
  
        setMainObject({
          formData: {
            marketName: response.data.marketName || '',
            marketNumber: response.data.marketNumber || '',
            companyName: response.data.companyName || '',
            usersRole: transformedRoles
          }        
        });
  
        if (response.data.file) {
          setFileURL(URL.createObjectURL(response.data.file));
        }
      } catch (error) {
        console.error("Failed to fetch market data:", error.response ? error.response.data : error.message);
      } finally {
        setLoadingfetch(false);
      }
    };
  
    fetchMarketData();
  }, [marketId]);
  

  const handleChange = (field, subField) => (event) => {
    const value = event.target.value;
  
    // Check if field is nested
    if (subField) {
      // Update nested field (e.g., usersRole)
      setMainObject(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          [field]: {
            ...prev.formData[field],
            [subField]: value
          }
        }
      }));
    } else {
      // Update non-nested field (e.g., marketName, marketNumber, companyName)
      setMainObject(prev => ({
        ...prev,
        formData: {
          ...prev.formData,
          [field]: value
        }
      }));
    }
  };
  

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      const newFileURL = URL.createObjectURL(newFile);
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
      }
      setFileURL(newFileURL);
      setMainObject(prev => ({
        ...prev,
        file: newFile
      }));
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    setLoadingfetch(true);
    try {
      const response = await updateMarket(marketId, mainObject.formData, mainObject.file);
      console.log('Market updated successfully:', response.data);
      navigate('/CP/home');
    } catch (error) {
      console.error("Failed to update market:", error.response ? error.response.data : error.message);
    } finally {
      setLoadingfetch(false);
    }
  };

  return (
    <Box component="section" sx={{ padding: '50px 10px', height: '78vh', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* Market Information Section */}
            <Box sx={{ flex: 1, paddingRight: '20px' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="market-name"
                    label="Le nom du marché"
                    variant="standard"
                    fullWidth
                    InputProps={{
                      sx: { height: '40px' },
                    }}
                    value={mainObject.formData.marketName}
                    onChange={handleChange('marketName')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="market-number"
                    label="Numéreau de marché"
                    variant="standard"
                    fullWidth
                    InputProps={{
                      sx: { height: '40px' },
                    }}
                    value={mainObject.formData.marketNumber}
                    onChange={handleChange('marketNumber')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="company-name"
                    label="L'entreprise"
                    variant="standard"
                    fullWidth
                    InputProps={{
                      sx: { height: '40px' },
                    }}
                    value={mainObject.formData.companyName}
                    onChange={handleChange('companyName')}
                  />
                </Grid>
                {/* File Upload */}
                <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    />
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
                    onClick={handleFileButtonClick}
                    />
                    <IconButton
                    sx={{ color: 'primary.main', ml: 2 }}
                    onClick={handleFileButtonClick}
                    >
                    <AddPhotoAlternateIcon />
                    </IconButton>
                </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Email Information Section */}
            <Box sx={{ flex: 1, paddingLeft: '20px' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                      id="qualiticien-email"
                      label="Qualiticien"
                      variant="standard"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                        sx: { height: '40px' },
                      }}
                      value={mainObject.formData.usersRole.QUALITICIEN}
                      onChange={handleChange('usersRole', 'QUALITICIEN')}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                        id="chef-qualite-email"
                        label="Chef de qualite"
                        variant="standard"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                          sx: { height: '40px' },
                        }}
                        value={mainObject.formData.usersRole.CHEFDEQUALITE}
                        onChange={handleChange('usersRole', 'CHEFDEQUALITE')}
                      />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                          id="chef-lot-email"
                          label="Chef de lot"
                          variant="standard"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                            sx: { height: '40px' },
                          }}
                          value={mainObject.formData.usersRole.CHEFDELOT}
                          onChange={handleChange('usersRole', 'CHEFDELOT')}
                        />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                            id="technicien-travaux-email"
                            label="Technicien de travaux"
                            variant="standard"
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              ),
                              sx: { height: '40px' },
                            }}
                            value={mainObject.formData.usersRole.TECHNICIENDETRAVAUX}
                            onChange={handleChange('usersRole', 'TECHNICIENDETRAVAUX')}
                          />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loadingfetch}>
              Mettre à jour
              {loadingfetch && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateMarket;
