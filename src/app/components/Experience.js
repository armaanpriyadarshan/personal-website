import { motion } from 'framer-motion';

export default function Experience({ 
  company, 
  location, 
  startDate, 
  endDate, 
  role, 
  description, 
  delay = 0,
  isLast = false
}) {
  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`border border-[var(--grey)] p-4 ${!isLast ? 'mb-8' : ''} hover:scale-105 transition-transform duration-200 group`}
    >
      {/* Header */}
      <div className="flex flex-col flex-row md:items-center justify-between mt-[-28px] md:mt-[-30px]">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <h3 className="text-base md:text-lg font-bold text-[var(--green)] font-mono bg-background px-2 uppercase">
            {company}
          </h3>
        </div>
        <div className="text-xs md:text-sm text-[var(--lightBlue)] font-mono mt-[5px] md:mt-0 md:text-right uppercase bg-background px-2">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
      </div>

      {/* Role and Location */}
      <div className="flex flex-col flex-row md:items-center justify-between mb-2 md:mb-3">
        <div className="mb-1 md:mb-0 max-w-1/2">
          <h4 className="text-sm md:text-base font-mono text-[var(--foreground)] px-2 uppercase">
            {role}
          </h4>
        </div>
        <div className="text-xs md:text-sm md:text-right font-mono uppercase px-2 max-w-1/2">
          [{location}]
        </div>
      </div>

      {/* Description */}
      <div className="text-sm font-mono text-[var(--grey)] group-hover:text-foreground transition-colors duration-200 leading-relaxed px-2">
        {description}
      </div>
    </motion.div>
  );
}