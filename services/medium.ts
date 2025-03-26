interface MediumPost {
  title: string;
  date: string;
  preview: string;
  link: string;
  thumbnail: string;
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@joaoac'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Medium posts');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => {
      // Extract thumbnail from content or description
      const content = item.content || item.description;
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = imgMatch ? imgMatch[1] : '';

      return {
        title: item.title,
        date: new Date(item.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        preview: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        link: item.link,
        thumbnail
      };
    });

  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}