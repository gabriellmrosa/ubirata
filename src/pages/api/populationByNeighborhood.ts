import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD']
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function getPopulationByNeighborhood(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors)

  res.setHeader('Cache-control', 's-maxage=10, stale-while-revalidate')
  const apiSecret = process.env.API_SECRET

  if (apiSecret === req.body.API_SECRET) {
    res.json(JSON.stringify(mockPopulationByNeighborhood))
  } else {
    res.status(401).send({ error: 'Wrong Api Secret' })
  }
}

export default getPopulationByNeighborhood

// -- Mock NeighborHoods -- //

const mockPopulationByNeighborhood = [
  {
    id_geometria: 1,
    ano: '2000',
    populacao: 11567
  },
  {
    id_geometria: 1,
    ano: '2002',
    populacao: 12345
  },
  {
    id_geometria: 1,
    ano: '2004',
    populacao: 13450
  },
  {
    id_geometria: 1,
    ano: '2006',
    populacao: 13550
  },
  {
    id_geometria: 2,
    ano: '2000',
    populacao: 17594
  },
  {
    id_geometria: 2,
    ano: '2002',
    populacao: 18998
  },
  {
    id_geometria: 2,
    ano: '2004',
    populacao: 21765
  },
  {
    id_geometria: 2,
    ano: '2006',
    populacao: 20210
  },
  {
    id_geometria: 3,
    ano: '2000',
    populacao: 7125
  },
  {
    id_geometria: 3,
    ano: '2002',
    populacao: 7690
  },
  {
    id_geometria: 3,
    ano: '2004',
    populacao: 7912
  },
  {
    id_geometria: 3,
    ano: '2006',
    populacao: 8105
  },
  {
    id_geometria: 4,
    ano: '2000',
    populacao: 10105
  },
  {
    id_geometria: 4,
    ano: '2002',
    populacao: 11750
  },
  {
    id_geometria: 4,
    ano: '2004',
    populacao: 11940
  },
  {
    id_geometria: 4,
    ano: '2006',
    populacao: 10930
  }
]
