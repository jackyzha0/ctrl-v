import React from 'react';
import useFetchPaste from "../../http/useFetchPaste";
import { useRouter } from 'next/router'


export default (req, res) => {
  const router = useRouter()
  const { hash } = router.query
  const { err, result } = useFetchPaste(hash)
  res.statusCode = 200
  res.json({
    text: 'Hello World! This is the Next.js starter kit :D',
  })
}