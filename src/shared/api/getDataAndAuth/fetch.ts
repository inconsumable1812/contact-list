import { base_url } from '../const';
import type { QueryParameters, Response } from './types';

const fetch = async (
  queryParameters: QueryParameters
): Promise<Response | globalThis.Error> => {
  try {
    const response = await globalThis.fetch(
      `${base_url}/users?name=${queryParameters.login}&password=${queryParameters.password}`
    );

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error as globalThis.Error;
  }
};

export { fetch };
