export const createJobQuery = `
  INSERT INTO jobs (date_added, date_updated, description, title, isActive )
  VALUES ($/date_added/, $/date_updated/, $/description/, $/title/, $/isActive/)
  RETURNING id;
`;

export const getJobsQuery = `SELECT * FROM jobs ORDER BY title`;

export const getJobQuery = `SELECT * FROM jobs WHERE id = $1`;

export const deleteJobQuery = "DELETE FROM jobs WHERE id = $1";

export const updateJobQuery = `UPDATE jobs
SET title = $/title/, description = $/description/, isActive = $/isActive/,
    dateAdded = $/dateAdded/, dateUpdated = $/dateUpdated/
WHERE id = $/id/`;
