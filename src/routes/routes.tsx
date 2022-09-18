import { FC } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Auth } from 'features/auth';
import { Mock } from 'shared/components';
import { ContactContainer } from 'features/contacts/view/containers/ContactContainer/ContactContainer';

type Props = {};

const RoutesSwitcher: FC<Props> = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Auth></Auth>} />
      <Route path="contacts" element={<ContactContainer />} />
      <Route path="*" element={<Mock></Mock>} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
