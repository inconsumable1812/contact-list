import { FC } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Auth } from 'features/auth';
import { Contacts } from 'features/contacts';
import { Mock } from 'shared/components';

type Props = {};

const RoutesSwitcher: FC<Props> = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Auth></Auth>} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="*" element={<Mock></Mock>} />
    </Routes>
  </BrowserRouter>
);

export default RoutesSwitcher;
