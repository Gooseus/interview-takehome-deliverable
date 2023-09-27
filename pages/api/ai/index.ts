import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { createLanguageModel, createJsonTranslator } from 'typechat';

import { FilterResponse } from '@/types/filters';

const model = createLanguageModel(process.env);
const schema = fs.readFileSync('./types/filters.ts', 'utf-8');
const translator = createJsonTranslator<FilterResponse>(model, schema, 'FilterResponse');

export default async function handler(req: NextApiRequest, res: NextApiResponse<FilterResponse>) {
  if(!req?.body?.text) {
    return res.status(400).json({ error: true });
  }
  const response = await translator.translate(req.body.text);
  if(!response.success) {
    return res.status(500).json({ error: true });
  }

  return res.status(200).json(response.data);
}
