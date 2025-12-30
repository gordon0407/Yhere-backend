const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Supabase 連線
const supabase = createClient(
  'https://micyilnlilkwbehahgdw.supabase.co',
  'sb_publishable_en6plLqL793C5orBlvobRw_BO8vT3Yy'
);

// 測試 API
app.get('/', (req, res) => {
  res.json({ message: '後端運作正常！' });
});

// 取得某國家景點
app.get('/spots', async (req, res) => {
  const country = req.query.country;

  const { data, error } = await supabase
    .from('spots')
    .select('*')
    .eq('country', country);

  res.json(data);
});

// 取得單一景點 + 評價
app.get('/spots/:id', async (req, res) => {
  const id = req.params.id;

  const { data: spot } = await supabase
    .from('spots')
    .select('*')
    .eq('id', id)
    .single();

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('spot_id', id)
    .order('created_at', { ascending: false });

  res.json({ ...spot, reviews });
});

// 新增評價
app.post('/spots/:id/reviews', async (req, res) => {
  const id = req.params.id;
  const { user, rating, comment } = req.body;

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      spot_id: id,
      user_name: user,
      rating,
      comment
    });

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('spot_id', id)
    .order('created_at', { ascending: false });

  res.json({ message: "評論已新增", reviews });
});

app.listen(3000, () => {
  console.log("後端伺服器已啟動：http://localhost:3000");
});
