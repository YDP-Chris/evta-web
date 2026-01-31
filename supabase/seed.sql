-- Seed data for EVTA trails
-- This provides sample data for development and testing

INSERT INTO trails (slug, name, short_description, description, activity_types, distance_miles, elevation_gain_ft, difficulty, features, status, trailhead_lat, trailhead_lng, parking_info, images) VALUES

('grassy-creek-trail', 'Grassy Creek Trail',
 'A scenic creekside trail perfect for families',
 'The Grassy Creek Trail follows the beautiful Grassy Creek through lush forest. This easy trail is perfect for families and offers several spots to access the creek. Watch for wildlife including deer, birds, and the occasional river otter.',
 ARRAY['Hike', 'Bike']::TEXT[],
 3.2, 150, 'Easy',
 ARRAY['Dog-friendly', 'Kid-friendly', 'River Access', 'Scenic Views']::TEXT[],
 'Open', 36.2441, -80.8487,
 'Free parking lot at trailhead with room for 20 cars. Additional street parking available.',
 ARRAY[]::TEXT[]),

('carter-falls-trail', 'Carter Falls Trail',
 'Moderate hike to a stunning 30-foot waterfall',
 'This popular trail leads through hardwood forest to the spectacular Carter Falls. The trail includes some rocky sections and moderate elevation gain. Best visited after rainfall when the falls are at their most impressive.',
 ARRAY['Hike']::TEXT[],
 2.8, 400, 'Moderate',
 ARRAY['Waterfall', 'Scenic Views', 'Dog-friendly']::TEXT[],
 'Open', 36.2523, -80.8612,
 'Small gravel lot with space for 10 vehicles. Arrive early on weekends.',
 ARRAY[]::TEXT[]),

('elkin-creek-greenway', 'Elkin Creek Greenway',
 'Paved multi-use path through downtown Elkin',
 'The Elkin Creek Greenway is a paved multi-use trail connecting downtown Elkin to the Yadkin River. Perfect for walking, jogging, or biking. The trail features interpretive signs about local history and ecology.',
 ARRAY['Hike', 'Bike']::TEXT[],
 2.0, 50, 'Easy',
 ARRAY['Kid-friendly', 'Accessible', 'Dog-friendly', 'Restrooms', 'Parking']::TEXT[],
 'Open', 36.2436, -80.8432,
 'Multiple access points with parking. Main lot at Crater Park.',
 ARRAY[]::TEXT[]),

('stone-mountain-loop', 'Stone Mountain Loop',
 'Challenging loop with panoramic views',
 'This challenging trail circles the iconic Stone Mountain, offering panoramic views of the Yadkin Valley. The trail includes steep sections and rocky terrain. Experienced hikers only. Bring plenty of water.',
 ARRAY['Hike']::TEXT[],
 6.5, 1200, 'Difficult',
 ARRAY['Scenic Views']::TEXT[],
 'Open', 36.3876, -81.0321,
 'State park parking lot. $6 day use fee required.',
 ARRAY[]::TEXT[]),

('yadkin-river-paddle', 'Yadkin River Paddle Trail',
 'Scenic paddling route on the Yadkin River',
 'A beautiful paddle trail on the Yadkin River from the Elkin boat launch to the takeout at Donnaha. Class I-II rapids suitable for beginners with some paddling experience. Watch for wildlife including herons, kingfishers, and turtles.',
 ARRAY['Paddle']::TEXT[],
 8.0, 0, 'Moderate',
 ARRAY['River Access', 'Scenic Views']::TEXT[],
 'Caution', 36.2567, -80.8234,
 'Boat launch with trailer parking. Shuttle service available on weekends.',
 ARRAY[]::TEXT[]),

('vineyard-trail', 'Vineyard Trail',
 'Easy walk through local vineyard with wine tasting',
 'This unique trail winds through the rolling hills of a local vineyard. Perfect for a relaxed afternoon walk followed by wine tasting. Dogs welcome but must be leashed. Trail is maintained by the vineyard.',
 ARRAY['Hike']::TEXT[],
 1.5, 100, 'Easy',
 ARRAY['Vineyard', 'Scenic Views', 'Dog-friendly', 'Kid-friendly', 'Restrooms']::TEXT[],
 'Open', 36.2298, -80.8654,
 'Free parking at the winery. Trail open during tasting room hours.',
 ARRAY[]::TEXT[]),

('bridle-creek-equestrian', 'Bridle Creek Equestrian Trail',
 'Multi-use trail open to horses, hikers, and bikers',
 'A well-maintained trail system designed for equestrian use but also open to hikers and mountain bikers. Wide trails with good footing. Horse trailer parking available.',
 ARRAY['Equestrian', 'Hike', 'Bike']::TEXT[],
 5.0, 300, 'Moderate',
 ARRAY['Dog-friendly', 'Parking']::TEXT[],
 'Open', 36.2678, -80.8123,
 'Large gravel lot with horse trailer parking. Water available for horses.',
 ARRAY[]::TEXT[]),

('mountain-bike-park', 'Elkin Mountain Bike Park',
 'Purpose-built mountain bike trails for all skill levels',
 'The Elkin Mountain Bike Park features purpose-built singletrack trails ranging from beginner flow trails to expert technical features. Trail conditions updated regularly on RecDesk.',
 ARRAY['Bike']::TEXT[],
 4.5, 450, 'Moderate',
 ARRAY['Parking', 'Restrooms']::TEXT[],
 'Open', 36.2543, -80.8345,
 'Paved parking lot with bike wash station. Restrooms on site.',
 ARRAY[]::TEXT[]);

-- Update the Yadkin River trail with a caution note
UPDATE trails
SET status_note = 'Water levels elevated after recent rain. Check conditions before launching.'
WHERE slug = 'yadkin-river-paddle';
