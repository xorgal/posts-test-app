interface PostEntry {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostQueryRequest {
  id: number | null;
}
